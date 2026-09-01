import { isValidReturnToPath } from '@/auth/utils/isValidReturnToPath';

describe('isValidReturnToPath', () => {
  it('should return false for empty string', () => {
    expect(isValidReturnToPath('')).toBe(false);
  });

  it('should return false for root path', () => {
    expect(isValidReturnToPath('/')).toBe(false);
  });

  it('should return false for paths not starting with slash', () => {
    expect(isValidReturnToPath('objects/people')).toBe(false);
  });

  it.each([
    '//evil.com',
    '\\\\evil.com',
    '/\\evil.com',
    '\\/evil.com',
    '/objects\\..\\evil',
  ])('should return false for malformed separator path %s', (path) => {
    expect(isValidReturnToPath(path)).toBe(false);
  });

  it('should return false for onboarding paths', () => {
    expect(isValidReturnToPath('/workspace-activation')).toBe(false);
    expect(isValidReturnToPath('/create/profile')).toBe(false);
  });

  it('should return false for sign-in paths', () => {
    expect(isValidReturnToPath('/welcome')).toBe(false);
    expect(isValidReturnToPath('/verify')).toBe(false);
  });

  it('should return false for reset-password paths', () => {
    expect(isValidReturnToPath('/reset-password')).toBe(false);
  });

  it('should return true for the workspace setup path', () => {
    expect(isValidReturnToPath('/workspace-setup')).toBe(true);
  });

  it('should return true for valid application paths', () => {
    expect(isValidReturnToPath('/objects/people')).toBe(true);
    expect(isValidReturnToPath('/settings/accounts')).toBe(true);
  });
});
