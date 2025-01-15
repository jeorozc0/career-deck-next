'use client';

import dynamic from 'next/dynamic'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  OnboardingFormInitialValuesType,
  onboardingFormSchema,
} from '@/schemas';

const defaultFormValues: OnboardingFormInitialValuesType = {
  headline: '',
  summary: '',
  location: '',
  phone: '',
  skills: [],
  experiences: [
    {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  education: [
    {
      name: '',
      type: '',
      major: '',
      startDate: '',
      endDate: '',
      gpa: '',
    }
  ],
};

const LOCAL_STORAGE_KEY = 'onboarding-form-data';

type OnboardingFormContextType = {
  formData: OnboardingFormInitialValuesType;
  updateFormDetails: (details: Partial<OnboardingFormInitialValuesType>) => void;
  dataLoaded: boolean;
  resetFormData: () => void;
};

const OnboardingFormContext = createContext<OnboardingFormContextType | null>(null);

const OnboardingFormProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<OnboardingFormInitialValuesType>(defaultFormValues);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const validated = onboardingFormSchema.safeParse(parsed);
        if (validated.success) {
          setFormData(validated.data);
        }
      }
      setDataLoaded(true);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      setDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [formData, dataLoaded]);

  const updateFormDetails = useCallback(
    (details: Partial<OnboardingFormInitialValuesType>) => {
      setFormData((prev) => ({ ...prev, ...details }));
    },
    []
  );

  const resetFormData = useCallback(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setFormData(defaultFormValues);
    } catch (error) {
      console.error('Error resetting form data:', error);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      formData,
      dataLoaded,
      updateFormDetails,
      resetFormData,
    }),
    [formData, dataLoaded, updateFormDetails, resetFormData]
  );

  return (
    <OnboardingFormContext.Provider value={contextValue}>
      {children}
    </OnboardingFormContext.Provider>
  );
};

// Dynamically import the provider with SSR disabled
export const OnboardingFormProvider = dynamic(
  () => Promise.resolve(OnboardingFormProviderComponent),
  { ssr: false }
);

export function useOnboardingFormContext() {
  const context = useContext(OnboardingFormContext);
  if (context === null) {
    throw new Error(
      'useOnboardingFormContext must be used within an OnboardingFormProvider'
    );
  }
  return context;
}
