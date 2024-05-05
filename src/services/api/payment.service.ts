import { api } from '@/lib/api';
import { BASE_URL } from 'shared/config';
import { CheckoutBody } from 'shared/types/payment';

export const checkout = async (body: CheckoutBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/stripe/checkout`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};

