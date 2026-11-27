import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, KeyRound, LogIn } from "lucide-react";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import donationLottie from "../../assets/donationJsonlottie.json";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      await Swal.fire({
        icon: "success",
        title: "Welcome back!",
        showConfirmButton: false,
        timer: 1400,
      });
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage = error.message
        .replace(/^Firebase: Error \(auth\//, "")
        .replace(/\)\.$/, "");
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: errorMessage,
      });
    }
  };

  const handleDemoCredentials = () => {
    setValue("email", "alamrayhan025@gmail.com");
    setValue("password", "123456");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Form Card */}
        <div className="lg:col-span-6">
          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Sign in to HopePulse
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Access your donor dashboard and requests.
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="xs"
                onClick={handleDemoCredentials}
              >
                <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                Demo Admin
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  autocorrect="off"
                  autocapitalize="none"
                  spellCheck={false}
                  placeholder="you@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "login-email-error" : undefined}
                  {...register("email", { required: "Email is required" })}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none"
                />
                {errors.email && (
                  <p id="login-email-error" className="mt-1 text-xs text-rose-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={
                      errors.password ? "login-password-error" : undefined
                    }
                    {...register("password", { required: "Password is required" })}
                    className="w-full rounded-xl border border-slate-300 py-2.5 pl-3.5 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="login-password-error"
                    className="mt-1 text-xs text-rose-600"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-600">
              New to HopePulse?{" "}
              <Link
                to="/registration"
                className="font-semibold text-rose-600 hover:text-rose-700 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </Card>
        </div>

        {/* Illustration */}
        <div className="hidden justify-center lg:col-span-6 lg:flex">
          <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
            <Lottie animationData={donationLottie} loop autoplay />
          </div>
        </div>
      </div>
    </section>
  );
}
