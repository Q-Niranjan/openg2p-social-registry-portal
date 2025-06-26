// components/forms/multiFormSteps.ts
import { User, FileText, CheckCircle, Info } from 'lucide-react';
import GroupForm from '@/components/forms/GroupForm';
import MemberForm from '@/components/forms/MemberForm';
import DocumentsForm from '@/components/forms/DocumentsForm';
import SuccessForm from '@/components/forms/SuccessForm';
import IndividaulForm from '@/components/forms/IndividualForm';
import AdditionalInfoForm from '@/components/forms/AdditionalInfoForm';

export interface Step {
  key: string;
  label: string;
  icon: React.ElementType;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.FC<any>;
}

export const steps: Step[] = [
  {
    key: 'group',
    label: 'Group Information',
    icon: User,
    description: 'Provide group’s basic demographic information',
    Component: GroupForm,
  },
    {
    key: 'individual',
    label: 'Individaul Information',
    icon: User,
    description: 'Provide individual’s basic demographic information',
    Component: IndividaulForm,
  },
  {
    key: 'member',
    label: 'Member Details',
    icon: User,
    description: 'Fill in details for each group member',
    Component: MemberForm,
  },
  {
    key: 'additional_info',
    label: 'Additional Information',
    icon: Info,
    description: 'Capture additional social and economic details',
    Component: AdditionalInfoForm,
  },
  {
    key: 'documents',
    label: 'Documents',
    icon: FileText,
    description: 'Upload all necessary documents',
    Component: DocumentsForm,
  },
  {
    key: 'success',
    label: 'Success',
    icon: CheckCircle,
    description: 'You’ve successfully completed the registration',
    Component: SuccessForm,
  },
];
