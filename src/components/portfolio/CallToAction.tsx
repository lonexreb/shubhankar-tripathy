import { Profile, JobApplication } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Calendar, Download, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CallToActionProps {
  profile: Profile;
  jobApplication: JobApplication;
  onContact: (method: string) => void;
}

const CallToAction = ({ profile, jobApplication, onContact }: CallToActionProps) => {
  const handleEmailContact = () => {
    const subject = encodeURIComponent(
      `Application for ${jobApplication.job_title || 'Position'} at ${jobApplication.company_name || 'Your Company'}`
    );
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in discussing the ${jobApplication.job_title || 'position'} opportunity${jobApplication.company_name ? ` at ${jobApplication.company_name}` : ''}.\n\nBest regards,\n${profile.full_name}`
    );
    
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`);
    onContact('email');
  };

  const handlePhoneContact = () => {
    window.open(`tel:${profile.phone}`);
    onContact('phone');
  };

  const handleScheduleCall = () => {
    // This would typically integrate with a calendar scheduling service
    // For now, we'll just track the action
    onContact('schedule_call');
    alert('Calendar scheduling would open here. Integration with Calendly, Cal.com, or similar service recommended.');
  };

  const handleDownloadPDF = () => {
    window.print();
    onContact('download_pdf');
  };

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl text-foreground">
              Let's Connect
            </CardTitle>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm excited about the opportunity to contribute to{' '}
              {jobApplication.company_name || 'your team'}
              {jobApplication.job_title && ` as a ${jobApplication.job_title}`}.
              Let's discuss how my experience can help drive your goals forward.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Primary Contact Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {profile.email && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleEmailContact}
                    className="w-full h-16 flex flex-col gap-1"
                    size="lg"
                  >
                    <Mail size={20} />
                    <span className="text-sm">Send Email</span>
                  </Button>
                </motion.div>
              )}

              {profile.phone && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handlePhoneContact}
                    variant="outline"
                    className="w-full h-16 flex flex-col gap-1"
                    size="lg"
                  >
                    <Phone size={20} />
                    <span className="text-sm">Call Now</span>
                  </Button>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleScheduleCall}
                  variant="outline"
                  className="w-full h-16 flex flex-col gap-1"
                  size="lg"
                >
                  <Calendar size={20} />
                  <span className="text-sm">Schedule Call</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleDownloadPDF}
                  variant="outline"
                  className="w-full h-16 flex flex-col gap-1 no-print"
                  size="lg"
                >
                  <Download size={20} />
                  <span className="text-sm">Download PDF</span>
                </Button>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="bg-background/50 rounded-lg p-6 space-y-4 border">
              <h3 className="font-semibold text-center text-foreground">Contact Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {profile.email && (
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-muted-foreground shrink-0" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">{profile.email}</div>
                    </div>
                  </div>
                )}

                {profile.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-muted-foreground shrink-0" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">{profile.phone}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Links */}
            {(profile.linkedin_url || profile.github_url || profile.website_url) && (
              <div className="flex flex-wrap justify-center gap-4">
                {profile.linkedin_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      window.open(profile.linkedin_url, '_blank');
                      onContact('linkedin');
                    }}
                  >
                    LinkedIn Profile
                  </Button>
                )}

                {profile.github_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      window.open(profile.github_url, '_blank');
                      onContact('github');
                    }}
                  >
                    GitHub Profile
                  </Button>
                )}

                {profile.website_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      window.open(profile.website_url, '_blank');
                      onContact('website');
                    }}
                  >
                    Portfolio Website
                  </Button>
                )}
              </div>
            )}

            {/* Thank You Message */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Thank you for taking the time to review my profile. 
                I look forward to hearing from you soon!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default CallToAction;