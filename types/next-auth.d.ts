import 'next-auth';

declare module 'next-auth' {
  /**
   * Extending the built-in session types
   */
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      picture?: string;
    };
  }

  //   interface Profile {
  //     id?: string;
  //     name?: string;
  //     email?: string;
  //     image?: string;
  //     picture?: string;
  //   }
}
