interface Attachment {
    filename: string;
    path?: Buffer | string;
    content?: Buffer | string;
    contentType?: string;
}

export interface EmailData {
    attachments?: Attachment[];
    text?: string;
    email?: string;
    password?: string;
    name?: string;
    subject?: string;
    template?: Buffer | string;
    from?: string;
    to?: string;
    html?: string | Buffer;
    redirectUrl?: string;
    logoUrl?: string;
    causeName?: string;
    organizationName?: string;
    organizationAddress?: string;
    organizationEmail?: string;
    organizationPhone?: string;
    donationDate?: string;
    donorName?: string;
    donorEmail?: string;
    donorAddress?: string;
    donationAmount?: number;
    paymentMethod?: string;
    transactionId?: string;
    taxDeductibleInformation?: string;
    additionalCharges?: string;
    zipFileLink?: string;
}