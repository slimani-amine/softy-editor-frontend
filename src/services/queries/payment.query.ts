import { useMutation } from '@tanstack/react-query';
import { CheckoutBody } from '@/types/payment';
import { checkout } from '../api/payment.service';

export const useCheckoutQuery = () =>
  useMutation(['checkout'], async (body: CheckoutBody) => {
    const res = await checkout(body);
    return res;
  });

