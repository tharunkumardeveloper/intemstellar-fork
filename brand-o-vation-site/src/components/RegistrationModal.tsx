import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  teamName: string;
  member1Name: string;
  member1Phone: string;
  member2Name: string;
  member2Phone: string;
  member3Name: string;
  member3Phone: string;
  member4Name?: string;
  member4Phone?: string;
  college: string;
  email: string;
  consent: boolean;
}

const RegistrationModal = ({ open, onOpenChange }: RegistrationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    member1Name: "",
    member1Phone: "",
    member2Name: "",
    member2Phone: "",
    member3Name: "",
    member3Phone: "",
    member4Name: "",
    member4Phone: "",
    college: "",
    email: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.consent) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    const filledMembers = [
      formData.member1Name,
      formData.member2Name,
      formData.member3Name,
      formData.member4Name
    ].filter(name => name.trim() !== "").length;

    if (filledMembers < 3) {
      toast.error("Team must have at least 3 members");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Registration successful! See you at the apocalypse.", {
        description: "Check your email for confirmation details."
      });
      
      onOpenChange(false);
      
      // Reset form
      setFormData({
        teamName: "",
        member1Name: "",
        member1Phone: "",
        member2Name: "",
        member2Phone: "",
        member3Name: "",
        member3Phone: "",
        member4Name: "",
        member4Phone: "",
        college: "",
        email: "",
        consent: false,
      });
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-2 border-accent/30">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-chromatic">
            JOIN THE APOCALYPSE
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Register your team for Brand-o-Vation: The Last Ad-pocalypse
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Team Name */}
          <div>
            <Label htmlFor="teamName" className="text-foreground">Team Name *</Label>
            <Input
              id="teamName"
              required
              value={formData.teamName}
              onChange={(e) => setFormData({...formData, teamName: e.target.value})}
              className="mt-1"
            />
          </div>

          {/* Members */}
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <Label htmlFor={`member${num}Name`} className="text-foreground">
                  Member {num} Name {num <= 3 && "*"}
                </Label>
                <Input
                  id={`member${num}Name`}
                  required={num <= 3}
                  value={formData[`member${num}Name` as keyof FormData] as string}
                  onChange={(e) => setFormData({...formData, [`member${num}Name`]: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`member${num}Phone`} className="text-foreground">
                  Phone {num <= 3 && "*"}
                </Label>
                <Input
                  id={`member${num}Phone`}
                  type="tel"
                  required={num <= 3}
                  pattern="[0-9]{10}"
                  value={formData[`member${num}Phone` as keyof FormData] as string}
                  onChange={(e) => setFormData({...formData, [`member${num}Phone`]: e.target.value})}
                  className="mt-1"
                  placeholder="10 digit number"
                />
              </div>
            </div>
          ))}

          {/* College */}
          <div>
            <Label htmlFor="college" className="text-foreground">College *</Label>
            <Input
              id="college"
              required
              value={formData.college}
              onChange={(e) => setFormData({...formData, college: e.target.value})}
              className="mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-foreground">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="mt-1"
            />
          </div>

          {/* Consent */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
            />
            <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I agree to the event rules and understand that all decisions made by judges and organizers are final and binding.
            </Label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              "REGISTER NOW"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
