'use client'; // Add this for client-side interactivity

import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact Message:', data); // Logs to console
    alert('Message sent! (Check console for details)'); // Placeholder
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <section className="py-12">
        <div className="container mx-auto max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input 
                type="text" 
                id="name" 
                {...register('name', { required: 'Name is required' })} 
                className="w-full p-2 border rounded" 
                placeholder="Your Name" 
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input 
                type="email" 
                id="email" 
                {...register('email', { 
                  required: 'Email is required', 
                  pattern: { 
                    value: /^\S+@\S+$/i, 
                    message: 'Invalid email address' 
                  } 
                })} 
                className="w-full p-2 border rounded" 
                placeholder="Your Email" 
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                {...register('message', { required: 'Message is required' })} 
                className="w-full p-2 border rounded" 
                rows={4} 
                placeholder="Your Message"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}