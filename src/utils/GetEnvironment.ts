type EnvVars = {
  [key: string]: string | undefined;
};

declare global {
  interface Window {
    env?: EnvVars;
  }
}

const getEnvVar = (key: string): string => {
  return (typeof window !== "undefined" && window.env?.[key]) ?? import.meta.env[key] ?? "";
};
export default getEnvVar