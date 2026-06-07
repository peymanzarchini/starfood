export interface Address {
  id: number;
  title: string;
  street: string;
  city: string;
  postalCode: string | null;
  phoneNumber: string;
  latitude: number | null;
  longitude: number | null;
  isDefault: boolean;
  fullAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressInput {
  title: string;
  street: string;
  city: string;
  postalCode?: string;
  phoneNumber: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export type UpdateAddressInput = Partial<CreateAddressInput>;
