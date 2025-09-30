import { notFound } from 'next/navigation';
import HearoInterrior from '@/components/heroInterior';
import ServiceDetailsContent from '@/components/ServiceDetailsContent';
import { detailedServicesData } from '@/lib/services-data';

function getServiceById(id: number) {
    return detailedServicesData.find(service => service.id === id);
}

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
    const serviceId = parseInt(params.id, 10);
    const service = getServiceById(serviceId);

    if (!service) {
        notFound();
    }

    return (
        <>
            <HearoInterrior
                title="Détails du Service"
                breadcrumbs={[
                    { name: "Accueil", href: "/" },
                    { name: "Services", href: "/services" },
                    { name: service.title }
                ]}
            />

            <ServiceDetailsContent
                service={service}
                allServices={detailedServicesData}
            />
        </>
    );
}