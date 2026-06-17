import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/ui/Container";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Your message has been sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      lines: ["123 Main Street", "New York, NY 10001"],
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      lines: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      lines: ["support@starfood.com", "info@starfood.com"],
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      lines: ["Mon - Fri: 10:00 - 23:00", "Sat - Sun: 11:00 - 00:00"],
    },
  ];

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page min-h-screen py-16">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight mt-6">
            We'd Love To <span className="text-primary italic">Hear From You</span>
          </h1>
          <p className="text-text-muted mt-4 font-medium">
            Whether you have a question about our menu, an issue with an order, or just want to say
            hello, our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-bg-surface dark:bg-dark-bg-surface p-6 rounded-4xl border border-slate-100 dark:border-slate-800 flex items-start gap-4 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-black text-text-main mb-1">{info.title}</h3>
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-sm text-text-muted font-medium">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-2 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full p-4 bg-bg-soft dark:bg-dark-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full p-4 bg-bg-soft dark:bg-dark-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-2 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help you?"
                    className="w-full p-4 bg-bg-soft dark:bg-dark-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-2 block">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full p-4 bg-bg-soft dark:bg-dark-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ContactUs;
