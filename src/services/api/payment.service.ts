import { api } from '@/lib/api';
import { CheckoutBody } from '@/types/payment';
import { BASE_URL } from 'shared/config';

export const checkout = async (body: CheckoutBody) => {
  console.log("🚀 ~ checkout ~ body:", body)
  try {
    const { data } = await api.post(`${BASE_URL}/stripe/checkout`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};

