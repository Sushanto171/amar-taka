"use client";

import { useRouteError, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";

interface ErrorPageProps {
  status?: number;
  statusText?: string;
  data?: string;
  message?: string;
}

const ErrorPage = () => {
  const error: ErrorPageProps = useRouteError() as ErrorPageProps;
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-muted/30 to-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl rounded-2xl border border-border/50">
          <CardHeader className="flex flex-col items-center gap-3 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <AlertCircle className="h-14 w-14 text-destructive" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-destructive">
              {error?.status || "Unexpected Error"}
            </CardTitle>
            <p className="text-muted-foreground">
              {error?.statusText || error?.message || "Something went wrong!"}
            </p>
          </CardHeader>

          <CardContent>
            {error?.data && (
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-muted p-3 rounded-lg text-sm text-left overflow-auto max-h-40"
              >
                {error.data}
              </motion.pre>
            )}
          </CardContent>

          <CardFooter className="flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => window.location.reload()}
                variant="default"
                className="rounded-xl flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate(-1)}
                variant="secondary"
                className="rounded-xl flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
