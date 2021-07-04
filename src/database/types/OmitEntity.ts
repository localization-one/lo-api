type OmitEntity<ENTITY> = Omit<
  ENTITY,
  'id' | 'setCreatedAt' | 'setUpdatedAt' | 'createdAt' | 'updatedAt'
>;

export { OmitEntity };
