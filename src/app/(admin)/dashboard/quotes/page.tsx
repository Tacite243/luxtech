"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchQuotes, toggleQuoteReadStatus, deleteQuote, replyToQuote } from '@/redux/features/quotesSlice';
import { Quote } from '@prisma/client';
import { Mail, MailOpen, Trash2, X, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ReplyForm from '@/components/ReplyForm';




export default function QuotesAdminPage() {
    const dispatch = useAppDispatch();
    // L'erreur 'quotes' vs 'quote' est résolue en corrigeant store.ts
    const { quotes, status, error: listError } = useAppSelector((state) => state.quotes);
    const { isLoading: isActionLoading } = useAppSelector((state) => state.ui);

    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchQuotes());
    }, [dispatch]);

    // Mettre à jour le devis sélectionné si la liste change
    useEffect(() => {
        if (selectedQuote) {
            const updatedQuote = quotes.find((q: Quote) => q.id === selectedQuote.id);
            setSelectedQuote(updatedQuote || null);
        }
    }, [quotes, selectedQuote]);

    const handleToggleRead = (quote: Quote) => {
        toast.promise(dispatch(toggleQuoteReadStatus({ id: quote.id, isRead: !quote.isRead })).unwrap(), {
            loading: 'Mise à jour...',
            success: 'Statut mis à jour !',
            error: 'Erreur lors de la mise à jour.',
        });
    };

    const handleDelete = async (quoteId: string) => {
        if (!window.confirm("Êtes-vous sûr ?")) return;
        await toast.promise(dispatch(deleteQuote(quoteId)).unwrap(), {
            loading: 'Suppression...',
            success: () => {
                setSelectedQuote(null);
                return 'Demande supprimée !';
            },
            error: (err) => err || 'Erreur lors de la suppression.',
        });
    };

    const handleReply = async (data: { subject: string, message: string }) => {
        if (!selectedQuote) return;
        await toast.promise(dispatch(replyToQuote({ id: selectedQuote.id, ...data })).unwrap(), {
            loading: 'Envoi de la réponse...',
            success: () => {
                setIsReplyModalOpen(false);
                return 'Réponse envoyée !';
            },
            error: (err) => err || 'Erreur lors de l\'envoi.',
        });
    };

    // --- CORRECTION : La variable `isLoading` est maintenant `isListLoading` ---
    const isListLoading = status === 'loading';

    const renderContent = () => {
        if (isListLoading) {
            return <p className="p-4 text-center text-gray-500">Chargement...</p>;
        }
        if (status === 'failed') {
            return <p className="p-4 text-center text-red-500">{listError || "Une erreur est survenue."}</p>;
        }
        if (quotes.length === 0) {
            return <p className="p-4 text-center text-gray-500">Aucune demande de devis.</p>;
        }
        // --- CORRECTION : Typer explicitement le paramètre `quote` ---
        return quotes.map((quote: Quote) => (
            <button
                key={quote.id}
                onClick={() => setSelectedQuote(quote)}
                className={`w-full text-left p-4 border-b hover:bg-gray-50 transition-colors ${selectedQuote?.id === quote.id ? 'bg-yellow-50' : ''} ${!quote.isRead ? 'font-bold' : 'font-normal text-gray-600'}`}
            >
                <div className="flex justify-between items-center">
                    <span>{quote.name}</span>
                    <span className="text-xs text-gray-400">{new Date(quote.createdAt).toLocaleDateString()}</span>
                </div>
                <p className={`text-sm truncate ${!quote.isRead ? 'text-gray-700' : 'text-gray-500'}`}>{quote.message}</p>
            </button>
        ));
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-white rounded-xl shadow-md border h-[calc(100vh-8rem)] flex flex-col">
                    <div className="p-4 border-b">
                        <h1 className="text-xl font-bold">Demandes de Devis</h1>
                    </div>
                    <div className="overflow-y-auto">
                        {renderContent()}
                    </div>
                </div>

                <div className="md:col-span-2 bg-white rounded-xl shadow-md border h-[calc(100vh-8rem)] flex flex-col">
                    {selectedQuote ? (
                        <>
                            <div className="p-4 border-b flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">{selectedQuote.name}</h2>
                                    <a href={`mailto:${selectedQuote.email}`} className="text-sm text-blue-600 hover:underline">{selectedQuote.email}</a>
                                    {selectedQuote.phone && <p className="text-sm text-gray-500">{selectedQuote.phone}</p>}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsReplyModalOpen(true)} title="Répondre" className="p-2 rounded-full hover:bg-gray-100"><Send /></button>
                                    <button onClick={() => handleToggleRead(selectedQuote)} title={selectedQuote.isRead ? "Marquer non lu" : "Marquer lu"} className="p-2 rounded-full hover:bg-gray-100">
                                        {selectedQuote.isRead ? <MailOpen /> : <Mail />}
                                    </button>
                                    <button onClick={() => handleDelete(selectedQuote.id)} title="Supprimer" className="p-2 rounded-full text-red-600 hover:bg-red-50">
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 overflow-y-auto flex-grow">
                                <p className="whitespace-pre-wrap">{selectedQuote.message}</p>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <p>Sélectionnez une demande pour voir les détails.</p>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isReplyModalOpen && selectedQuote && (
                    <motion.div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center" onClick={() => setIsReplyModalOpen(false)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl"
                        >
                            <div className="p-4 border-b flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Répondre à {selectedQuote.name}</h2>
                                <button onClick={() => setIsReplyModalOpen(false)}><X /></button>
                            </div>
                            <ReplyForm
                                onSubmit={handleReply}
                                onClose={() => setIsReplyModalOpen(false)}
                                isLoading={isActionLoading}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}