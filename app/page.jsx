import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon, MoveRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];

export default function Home() {
  return (
    <main className="mx-5">
      <div className="flex flex-col md:flex-row justify-between items-center pt-16 ">
        <div className="flex flex-1 flex-col gap-2">
          <h1 className="text-7xl text-blue-600 font-extrabold">Simplify Your Scheduling</h1>
          <p className="text-[16px] text-gray-500 font-medium py-4">Schedulrr helps you manage your time effectively. Create events, set your availability, and let others book time with you seamlessly.</p>
        </div>
        <div className="flex justify-center items-center flex-1">
          <Image
            src='/poster.png'
            height={500}
            width={500}
            alt="poster"
            className=""
          />
        </div>
      </div>
      <div className="mb-20 flex justify-center md:justify-start py-5 ">
        <Button className="flex justify-center items-center gap-2">Get Started <MoveRightIcon size={18} /></Button>
      </div>
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {
            features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                  <CardTitle className="text-blue-600 font-bold  text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center font-normal text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>

            ))
          }
        </div>
      </div>
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">What Our Users Say</h2>
        <Testimonials />
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">How It works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" >
          {
            howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))
          }
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-lg p-8 text-center mb-24">
        <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Scheduling?</h2>
        <p className="text-xl mb-6">Join thousands of professional who trust Schedulrr for efficient time management.</p>
        <Link href='/dashboard'>
          <Button size='lg' variant="secondary" className="text-blue-600">Start For Free <ArrowRight className="ml-2 h-5 w-5" /></Button>
        </Link>
      </div>
    </main>
  );
}
