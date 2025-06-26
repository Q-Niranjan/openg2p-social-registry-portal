// utils/generateReferenceId.ts

export type RegistrationType = 'group' | 'member' | 'individaul'; 

export const generateReferenceId = (type: RegistrationType): string => {
  const prefixMap: Record<RegistrationType, string> = {
    group: 'GRP',
    member: 'MBR',
    individaul: 'IND',
  };

  const openg2pPrefix = 'OPENG2P';
  const typePrefix = prefixMap[type] || 'UNK';

  const timestamp = Date.now().toString(36).toUpperCase(); 
  const random = Math.random().toString(36).substring(2, 6).toUpperCase(); 

  return `${openg2pPrefix}-${typePrefix}-${timestamp}-${random}`;
};
