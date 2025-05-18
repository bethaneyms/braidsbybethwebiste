"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2, ArrowRight, Loader2 } from "lucide-react"
import { RevealAnimation } from "@/components/reveal-animation"
import { useToast } from "@/hooks/use-toast"

export default function BookingPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    size: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.service || !date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          size: formData.size,
          date: date?.toISOString(),
          notes: formData.notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setSubmitted(true)
      toast({
        title: "Booking request submitted!",
        description: "Check your email for confirmation details.",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: "Your booking request couldn't be submitted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const services = [
    { id: "knotless", name: "Knotless Braids" },
    { id: "traditional", name: "Traditional Braids" },
    { id: "boho", name: "Boho Braids" },
    { id: "senegalese", name: "Senegalese Twists" },
    { id: "passion", name: "Passion Twists" },
    { id: "natural-twists", name: "Two-Strand Twists (natural hair)" },
    { id: "parting", name: "Basic Parting Only" },
  ]

  const sizes = [
    { id: "large", name: "Large", services: ["knotless", "traditional", "senegalese", "passion"] },
    { id: "medium", name: "Medium", services: ["knotless", "traditional", "boho", "senegalese", "passion"] },
    { id: "small", name: "Small", services: ["knotless", "traditional", "boho", "senegalese", "passion"] },
  ]

  // Filter sizes based on selected service
  const availableSizes = sizes.filter((size) => (formData.service ? size.services.includes(formData.service) : true))

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-black">
        <div className="container text-center">
          <RevealAnimation>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              BOOK AN <span className="text-red">APPOINTMENT</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Fill out the form below to request your appointment. A $15 deposit is required to secure your booking.
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-10 pb-20 bg-black">
        <div className="container max-w-2xl">
          <RevealAnimation>
            {!submitted ? (
              <div className="booking-form">
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`flex flex-col items-center ${currentStep === step ? "opacity-100" : "opacity-50"}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                            currentStep >= step ? "bg-red" : "bg-muted"
                          }`}
                        >
                          {step}
                        </div>
                        <span className="text-xs text-white">
                          {step === 1 ? "Service" : step === 2 ? "Date" : "Details"}
                        </span>
                      </div>
                    ))}
                    <div className="absolute left-0 right-0 h-1 bg-muted top-5 -z-10"></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-white">
                          Select a Service: <span className="text-red">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) => {
                            handleSelectChange("service", value)
                            // Reset size if changing service
                            setFormData((prev) => ({ ...prev, size: "" }))
                          }}
                          value={formData.service}
                          required
                        >
                          <SelectTrigger
                            id="service"
                            className="bg-black border-red/50 focus:border-red focus:ring-red"
                          >
                            <SelectValue placeholder="Choose your style" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-red">
                            {services.map((service) => (
                              <SelectItem
                                key={service.id}
                                value={service.id}
                                className="focus:bg-red/20 focus:text-white"
                              >
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.service && formData.service !== "natural-twists" && formData.service !== "parting" && (
                        <div className="space-y-2">
                          <Label htmlFor="size" className="text-white">
                            Select Size: <span className="text-red">*</span>
                          </Label>
                          <Select
                            onValueChange={(value) => handleSelectChange("size", value)}
                            value={formData.size}
                            required
                          >
                            <SelectTrigger id="size" className="bg-black border-red/50 focus:border-red focus:ring-red">
                              <SelectValue placeholder="Choose size" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-red">
                              {availableSizes.map((size) => (
                                <SelectItem key={size.id} value={size.id} className="focus:bg-red/20 focus:text-white">
                                  {size.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="pt-4 flex justify-end">
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-red hover:bg-red/80 text-white glow-on-hover"
                          disabled={
                            !formData.service ||
                            (formData.service !== "natural-twists" && formData.service !== "parting" && !formData.size)
                          }
                        >
                          CONTINUE
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="space-y-2">
                        <Label className="text-white">
                          Select a Date: <span className="text-red">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-black border-red/50 text-white"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-black border-red">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              className="bg-black text-white"
                              // Disable past dates
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          className="border-red/50 text-white hover:bg-red/10"
                        >
                          BACK
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-red hover:bg-red/80 text-white glow-on-hover"
                          disabled={!date}
                        >
                          CONTINUE
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Your Name: <span className="text-red">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-black border-red/50 focus:border-red focus:ring-red"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email: <span className="text-red">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          type="email"
                          required
                          className="bg-black border-red/50 focus:border-red focus:ring-red"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          Phone Number: <span className="text-red">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          type="tel"
                          required
                          className="bg-black border-red/50 focus:border-red focus:ring-red"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-white">
                          Additional Notes:
                        </Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={4}
                          className="bg-black border-red/50 focus:border-red focus:ring-red"
                          placeholder="Any specific requests or information about your hair"
                        />
                      </div>

                      <div className="pt-4 flex justify-between">
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          className="border-red/50 text-white hover:bg-red/10"
                        >
                          BACK
                        </Button>
                        <Button
                          type="submit"
                          className="bg-red hover:bg-red/80 text-white glow-on-hover"
                          disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              SUBMITTING...
                            </>
                          ) : (
                            "SUBMIT REQUEST"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <div className="booking-form text-center animate-in fade-in duration-500">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-red flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Booking Request Submitted!</h3>
                  <p className="text-white/70">
                    Thank you for your booking request, {formData.name}! I'll be in touch soon to confirm your
                    appointment and collect the $15 deposit.
                  </p>
                  <div className="bg-black/30 p-6 rounded-lg mt-4 text-left w-full">
                    <h4 className="text-xl font-bold text-red mb-4">Booking Details:</h4>
                    <p className="text-white mb-2">
                      <span className="font-semibold">Service:</span>{" "}
                      {services.find((s) => s.id === formData.service)?.name}
                      {formData.size && ` (${sizes.find((s) => s.id === formData.size)?.name})`}
                    </p>
                    <p className="text-white mb-2">
                      <span className="font-semibold">Date:</span> {date ? format(date, "PPP") : ""}
                    </p>
                    <p className="text-white mb-2">
                      <span className="font-semibold">Email:</span> {formData.email}
                    </p>
                    <p className="text-white">
                      <span className="font-semibold">Phone:</span> {formData.phone}
                    </p>
                  </div>
                  <p className="text-white/70 mt-4">
                    A confirmation email has been sent to your email address. Please check your inbox (and spam folder).
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false)
                      setCurrentStep(1)
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        service: "",
                        size: "",
                        notes: "",
                      })
                      setDate(undefined)
                    }}
                    className="mt-4 bg-red hover:bg-red/80 text-white glow-on-hover"
                  >
                    SUBMIT ANOTHER REQUEST
                  </Button>
                </div>
              </div>
            )}
          </RevealAnimation>
        </div>
      </section>

      {/* Policies Reminder */}
      <section className="py-20 animated-gradient">
        <div className="container max-w-4xl">
          <RevealAnimation>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              IMPORTANT <span className="text-black">REMINDERS</span>
            </h2>
          </RevealAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealAnimation delay={200}>
              <div className="bg-black p-8 rounded-lg border border-red/30">
                <h3 className="text-xl font-bold text-red mb-4">Before Your Appointment</h3>
                <ul className="text-white/70 space-y-3 list-disc pl-5">
                  <li>Hair must be clean and free of heavy product buildup</li>
                  <li>Detangle thoroughly from root to tip</li>
                  <li>Arrive with blow-dried hair if possible</li>
                  <li>Be on time to respect both your time and mine</li>
                </ul>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={400}>
              <div className="bg-black p-8 rounded-lg border border-red/30">
                <h3 className="text-xl font-bold text-red mb-4">Deposit & Cancellation</h3>
                <ul className="text-white/70 space-y-3 list-disc pl-5">
                  <li>A $15 deposit is required to secure your appointment</li>
                  <li>24-hour notice is required for a full deposit refund</li>
                  <li>Same-day cancellations or no-shows will result in a non-refundable deposit</li>
                  <li>Hair must be dropped off at least 1 day before your appointment</li>
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>
    </div>
  )
}
