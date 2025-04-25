
import { Mail, MapPin, Clock, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea1 } from "@/components/ui/textarea1";

const Contact = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h4 className="text-red-600 font-medium mb-2">CONTACT</h4>
          <h2 className="text-4xl font-playfair mb-4">Contact <span className="text-red-600">Us</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Need help with a recipe? Looking for personalized culinary advice? We're here to assist you with all your cooking needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-playfair mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-red-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Location:</p>
                  <p className="text-gray-600">A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-red-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Open Hours:</p>
                  <p className="text-gray-600">Monday-Saturday: 11AM - 11PM<br />Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-red-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Email:</p>
                  <p className="text-gray-600">info@savorithm.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-red-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Call:</p>
                  <p className="text-gray-600">+1 5589 55488 55</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Subject"
                  className="w-full"
                />
              </div>

              <div>
                <Textarea1
                  placeholder="Enter your message"
                  className="w-full min-h-[200px]"
                />
              </div>

              <div className="text-center">
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-8">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
