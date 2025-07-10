"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, MailIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [emailPending, startTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get("email") as string;
  const router = useRouter();
  const isOTPCompleted = otp.length === 6;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function VerifyOTP() {
    startTransition(async () => {
      authClient.emailOtp.verifyEmail(
        {
          email: email!,
          otp: otp,
        },
        {
          onSuccess: () => {
            setPending(false);
            toast.success("Email verified successfully!");
            router.push("/");
          },
          onError: ({ error }) => {
            setPending(false);
            setError(error.message);
            toast.error(error.message);
          },
        },
      );
    });
  }

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="flex items-center justify-center gap-x-4 select-none">
        <Image
          src="/logo.svg"
          alt="Logo Image"
          className="pointer-events-none object-cover"
          width={64}
          height={64}
        />
        <h2 className="text-primary text-2xl font-bold md:text-4xl">
          LearnVex
        </h2>
      </div>
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <MailIcon className="h-8 w-8" />
          </div>
          <CardTitle className="text-xl">Please Check Your Email</CardTitle>
          <CardDescription>
            We have sent a verification code to your email address. Please open
            your inbox and paste the code below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <InputOTP
              maxLength={6}
              className="gap-2"
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot key={0} index={0} />
                <InputOTPSlot key={1} index={1} />
                <InputOTPSlot key={2} index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot key={3} index={3} />
                <InputOTPSlot key={4} index={4} />
                <InputOTPSlot key={5} index={5} />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-muted-foreground text-sm">
              Please enter the 6-digit verification code sent to your email
              address.
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={VerifyOTP}
            disabled={emailPending || !isOTPCompleted}
            className="w-full"
          >
            {emailPending ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                Verifying ...
              </>
            ) : (
              <span>Verify</span>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
