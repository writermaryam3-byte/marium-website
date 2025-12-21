export interface MoyasarPaymentResponse {
    id: string;
    status: 'initiated' | 'paid' | 'failed' | 'authorized';
    amount: number;
    currency: string;
    source: {
      type: string;
      company?: string;
      name?: string;
      number?: string;
      message?: string;
    };
  }