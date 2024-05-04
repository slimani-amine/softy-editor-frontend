import { api } from '@/lib/api';
import { CheckoutBody } from '@/types/payment';
import { BASE_URL } from 'shared/config';

export const checkout = async (body: CheckoutBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/stripe/checkout`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};

