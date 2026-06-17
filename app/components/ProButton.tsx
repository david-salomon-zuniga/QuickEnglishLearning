"use client"

interface ProButtonProps {
    checkoutUrl: string;
    isPro: boolean;
    userId: string; // Necesitamos el ID para pasarlo al Webhook
}

export default function ProButton({ checkoutUrl, isPro, userId }: ProButtonProps) {
    if (isPro) {
        return (
            <div className="px-2 py-1 md:px-4 md:py-1.5 bg-gray-200 text-gray-500 text-xs md:text-sm font-bold rounded-full cursor-default border border-gray-300">
                PRO VERSION!
            </div>
        )
    }

    const handleOpenCheckout = (e: React.MouseEvent) => {
        e.preventDefault(); // Evita que el navegador navegue al link directamente

        // @ts-ignore
        if (window.LemonSqueezy) {
            // @ts-ignore
            window.LemonSqueezy.Url.Open(checkoutUrl, {
                custom: {
                    user_id: userId // ¡Aquí está la magia para tu Webhook!
                }
            });
        }
    };

    return (
        <button
            onClick={handleOpenCheckout}
            className="px-2 py-1 md:px-4 md:py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs md:text-sm font-bold rounded-full hover:shadow-md transition shadow-sm cursor-pointer"
        >
            PRO
        </button>
    )
}