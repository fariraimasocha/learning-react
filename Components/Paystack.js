'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { verifyTrasaction } from '@/utils/paystack';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  amount: z.coerce.number().min(1, 'Amount must be positive'),
});

export default function MyForm() {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();

  const checkPayment = async (reference) => {
    verifyTrasaction(reference).then((res) => {
      console.log('Verification result:', res);
      if (res.success === 'true') {
        toast.success('Payment verified successfully!');
      } else {
        toast.error('Payment verification failed: ' + res.error);
      }
    });
  };

  useEffect(() => {
    console.log('Route params:', params.get('reference'));
    if (params.get('reference')) {
      checkPayment(params.get('reference'));
    }
  }, [params]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      amount: 0,
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    const loadingToast = toast.loading('Submitting form...');

    try {
      const response = await axios.post('/api/paystack', values);

      console.log('Paystack response:', response.data);

      if (
        response.status === 200 &&
        response.data.transaction?.data?.authorization_url
      ) {
        window.location.href = response.data.transaction.data.authorization_url;
      } else {
        toast.error('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Form {...form} className="w-full max-w-md">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    type="email"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="amount"
                    type="number"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Enter the amount</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
