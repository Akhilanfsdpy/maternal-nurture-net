
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BirthCertificate } from '@/types/newbornHealth';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  childName: z.string().min(2, { message: "Child's name must be at least 2 characters." }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required." }),
  timeOfBirth: z.string().min(1, { message: "Time of birth is required." }),
  gender: z.string().min(1, { message: "Gender is required." }),
  weight: z.string().min(1, { message: "Weight is required." }),
  height: z.string().min(1, { message: "Height is required." }),
  apgarScore: z.string().optional(),
  parentName1: z.string().min(2, { message: "Parent's name must be at least 2 characters." }),
  parentName2: z.string().optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  contactNumber: z.string().min(6, { message: "Contact number is required." }),
  hospitalName: z.string().min(2, { message: "Hospital name is required." }),
  doctorName: z.string().min(2, { message: "Doctor's name is required." }),
});

interface BirthCertificateFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const BirthCertificateForm: React.FC<BirthCertificateFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childName: '',
      dateOfBirth: new Date().toISOString().substring(0, 10),
      timeOfBirth: new Date().toTimeString().substring(0, 5),
      gender: '',
      weight: '',
      height: '',
      apgarScore: '',
      parentName1: '',
      parentName2: '',
      address: '',
      contactNumber: '',
      hospitalName: '',
      doctorName: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    toast({
      title: "Form Submitted",
      description: "Birth certificate information has been submitted.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Child Information</h3>
            <FormField
              control={form.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Child's Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name as it will appear on certificate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeOfBirth"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Time of Birth</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 3.2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="apgarScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>APGAR Score</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 9/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Parent/Guardian Information</h3>
            <FormField
              control={form.control}
              name="parentName1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent/Guardian 1 Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentName2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent/Guardian 2 Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Full address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="text-lg font-medium pt-3">Hospital Information</h3>
            <FormField
              control={form.control}
              name="hospitalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital/Birth Center Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of facility" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attending Doctor/Midwife</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of healthcare provider" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-health-pink to-health-light-pink"
        >
          Generate Birth Certificate
        </Button>
      </form>
    </Form>
  );
};

export default BirthCertificateForm;
