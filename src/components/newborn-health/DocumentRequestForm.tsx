
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  childName: z.string().min(2, {
    message: "Child's name must be at least 2 characters.",
  }),
  requestReason: z.string().min(5, {
    message: "Please provide a reason for your request.",
  }),
});

interface DocumentRequestFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const DocumentRequestForm: React.FC<DocumentRequestFormProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childName: '',
      requestReason: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="childName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Child's Full Name (as it should appear on documents)</FormLabel>
              <FormControl>
                <Input placeholder="Full legal name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requestReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Request</FormLabel>
              <FormControl>
                <Input placeholder="Brief explanation for requesting documents" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-gradient-to-r from-health-pink to-health-light-pink">
          Submit Request
        </Button>
      </form>
    </Form>
  );
};

export default DocumentRequestForm;
