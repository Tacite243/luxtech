import axios from "axios";

// Assurez-vous que ces variables sont bien dans votre .env
const baseURL = process.env.AIRTEL_API_BASE_URL!;
const clientId = process.env.AIRTEL_CLIENT_ID!;
const clientSecret = process.env.AIRTEL_CLIENT_SECRET!;

// Fonction pour obtenir le token d'accès
export async function getAccessToken() {
    const { data } = await axios.post(`${baseURL}/auth/oauth2/token`, {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
    });
    return data.access_token;
}

// Fonction pour initier le paiement
export async function initiateAirtelPayment(amount: number, phone: string, orderId: string) {
    const token = await getAccessToken();

    // Le payload est la "lettre" que nous envoyons à Airtel
    const payload = {
        reference: "Paiement LuxTech Services", // Description pour le client
        subscriber: {
            country: "CD",
            currency: "CDF", // Assurez-vous que c'est la bonne devise
            msisdn: phone,   // Le numéro du client qui paie
        },
        transaction: {
            amount,          // Le montant calculé sur notre serveur
            country: "CD",
            currency: "CDF",
            id: orderId,     // Notre ID de commande, pour faire le lien
        },
    };

    const { data } = await axios.post(`${baseURL}/merchant/v1/payments/`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            'X-Country': 'CD',
            'X-Currency': 'CDF',
        },
    });

    return data;
}