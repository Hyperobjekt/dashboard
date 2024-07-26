import create from 'zustand';

/**
 * This store contains state for the app module
 */

export const CAN_VIEW_STATES = 'can:view-states';
export const CAN_VIEW_CITIES = 'can:view-cities';
export const CAN_VIEW_TRACTS = 'can:view-tracts';

export const useAppStore = create((set, get) => ({
  member: null,
  canViewStates: false,
  canViewCities: false,
  canViewTracts: false,
  setMember: (member) => {
    const hasPermission = (permission) => member.permissions.includes(permission);
    set({
      member,
      canViewCities: hasPermission(CAN_VIEW_CITIES),
      canViewStates: hasPermission(CAN_VIEW_STATES),
      canViewTracts: hasPermission(CAN_VIEW_TRACTS),
    });
  },
}));

export default useAppStore;
