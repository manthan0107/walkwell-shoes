
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from "react-redux";
import { addContact } from "@/store/shop/contact-slice";

export default function ShoppingContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const { toast } = useToast();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addContact(formData)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Message Sent",
                    description: "We've received your message and will get back to you soon.",
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to send message. Please try again.",
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground animate-fade-in">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white overflow-hidden py-16 lg:py-24">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-pink-200 bg-clip-text text-transparent">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Have a question or just want to say hello? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Contact Form Details - Left Side (based on reference, but reversed for standard flow usually, let's follow reference: Left is Request) */}
                    {/* Reference Image: Left = Form, Right = Details. */}

                    {/* Contact Form */}
                    <div className="bg-card shadow-xl rounded-2xl p-6 sm:p-10 border border-muted">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                                <MessageSquare className="w-8 h-8 text-purple-600" />
                                Get in Touch
                            </h2>
                            <p className="text-muted-foreground">
                                We'd love to hear from you! Send us your thoughts, questions, or feedback.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Your full name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-background"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-background"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Write your message..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="min-h-[150px] bg-background resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Send Message
                                <Send className="ml-2 w-5 h-5" />
                            </Button>
                        </form>
                    </div>

                    {/* Contact Details & Map */}
                    <div className="space-y-8">
                        <div className="bg-card shadow-xl rounded-2xl p-8 border border-muted h-full flex flex-col">
                            <h2 className="text-3xl font-bold mb-8">Contact Details</h2>

                            <div className="space-y-8 flex-grow">
                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Our Office</h3>
                                        <p className="text-muted-foreground">
                                            WELCOME FOOTWEAR, D 7 Jankalyan Society,<br />
                                            near Tekrawala School, Palanpur Patia,<br />
                                            Surat, Gujarat 395009
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-pink-600 dark:text-pink-400">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                        <p className="text-muted-foreground">
                                            +91 12345 67890<br />
                                            Mon-Sat 9am-9pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                                        <p className="text-muted-foreground">
                                            contact@walkwell.com<br />
                                            support@walkwell.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Map Integration */}
                            <div className="mt-8 relative w-full h-64 bg-muted/50 rounded-xl overflow-hidden shadow-md border border-muted">
                                <iframe
                                    src="https://maps.google.com/maps?q=WELCOME%20FOOTWEAR%2C%20D%207%20Jankalyan%20Society%2C%20near%20Tekrawala%20School%2C%20Palanpur%20Patia%2C%20Surat%2C%20Gujarat%20395009&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
