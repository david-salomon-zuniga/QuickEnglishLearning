import React from 'react';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
    content: string;
}

export const SafeHtml: React.FC<SafeHtmlProps> = ({ content }) => {
    // Asegura que DOMPurify funcione correctamente tanto en SSR (Servidor) como en el Cliente
    const isClient = typeof window !== 'undefined';

    // Limpia el contenido eliminando cualquier JS, scripts, handlers de eventos (onerror, onload), etc.
    const sanitizedContent = isClient
        ? DOMPurify.sanitize(content)
        : content; // En el servidor pasa el string limpio preliminar

    return (
        <div
            className="prose max-w-none text-slate-800" // Tus clases de Tailwind usuales
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
};

