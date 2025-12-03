export type MemberRole = 'self' | 'child' | 'partner';

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
}
