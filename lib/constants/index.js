export const APP_NAME =
    process.env.NEXT_PUBLIC_APP_NAME || 'Todo';

export const APP_DESCRIPTION =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    'A modern todo app built with Next.js';

export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const statusColor = {
    backlog: "bg-muted text-muted-foreground",
    pending: "bg-yellow-100 text-yellow-800",
    done: "bg-green-100 text-green-800",
};
