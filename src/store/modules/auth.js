// src/store/modules/auth.js
import { defineStore } from 'pinia';
import { supabase } from '@/supabase.config';
import router from '@/router'; // Import your router instance

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        session: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        accessToken: null,
    }),
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setSession(state, session) {
           state.session = session
        }
    },
    getters: {
        isLoggedIn: (state) => !!state.user && !!state.accessToken, // Reactive way to check if user is logged in
        getUser(state) {
            return state.user;
        },
        getSession(state) {
            return state.session;
        },
        getLoading(state) {
            return state.loading;
        },
        getError(state) {
            return state.error;
        },
        getIsAuthenticated(state) {
            return state.isAuthenticated;
        },
        
    },
    actions: {
        async signUp(credentials) {
            this.loading = true;
            this.error = null;
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: credentials.email,
                    password: credentials.password,
                    options: {
                        data: {
                          full_name: credentials.full_name,
                          username: credentials.username,
                        },
                      },
                });
                if (error) throw error;
                this.user = data.user;
                this.session = data.session;
                this.isAuthenticated = true;
                this.accessToken = data.session.access_token;
                router.push('/profile'); // Redirect to user profile
            } catch (error) {
                this.error = error.message;
                console.error('Sign up error:', error.message);
                // Optionally, show a user-friendly error message
            } finally {
                this.loading = false;
            }
        },
   
        async signIn(credentials) {
            this.loading = true;
            this.error = null;
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: credentials.email,
                    password: credentials.password,
                });
                if (error) throw error;
                this.user = data.user;
                this.session = data.session;
                this.isAuthenticated = true;
                this.accessToken = data.session.access_token;
                // Optionally, fetch additional user data from Supabase if needed
                 this.fetchUser();
   
                router.push('/profile'); // Redirect to user profile or previous page
            } catch (error) {
                this.error = error.message;
                console.error('Sign in error:', error.message);
            } finally {
                this.loading = false;
            }
        },
        async signInWithSocial(provider) {
            this.loading = true;
            this.error = null;
            try {
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: provider
                });
                if(error) throw error;
                this.user = data.user;
                this.session = data.session;
                this.isAuthenticated = true;
                this.accessToken = data.session.access_token;
                router.push('/profile');
   
            } catch (error) {
                this.error = error.message;
                console.error('Sign in with social error:', error);
            } finally {
                this.loading = false;
            }
        },
        initializeAuth() {
            // Set initial state
            this.refreshAuthState()
            // Listen to changes in the user's auth state
            supabase.auth.onAuthStateChange(async (event, session) => {
              console.log('Auth state changed:', event);
              this.refreshAuthState()
              if(event === "SIGNED_IN"){
                this.fetchUser();
                router.push('/profile')
              }
              if(event === "SIGNED_OUT"){
                router.push('/login')
              }
            });
          },
          async refreshAuthState(){
              const {data} = await supabase.auth.getSession();
              this.session = data.session
              this.isAuthenticated = !!this.session;
          },
   
        async signOut() {
            this.loading = true;
            this.error = null;
            try {
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
                this.user = null;
                this.session = null;
                this.accessToken = null;
                this.isAuthenticated = false;
                router.push('/'); // Redirect to home page
            } catch (error) {
                this.error = error.message;
                console.error('Sign out error:', error.message);
            } finally {
                this.loading = false;
            }
        },
        async fetchUser() {
            this.loading = true;
            this.error = null;
            try {
                const { data: { user } , error} = await supabase.auth.getUser();
                if (error) throw error;
                if (user) {
                    this.user = user;
                    const {data, error: detailsError} = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                    if (detailsError) throw detailsError;
                    this.user = {...user, ...data}
                    this.isAuthenticated = true;
                }
            } catch (error) {
                this.error = error.message;
                console.error('Error fetching user:', error);
                this.isAuthenticated = false;
                this.user = null;
                this.accessToken = null;
            } finally {
                this.loading = false;
            }
        },
   
        persistAuthState() {
            supabase.auth.onAuthStateChange((_event, session) => {
              if (session) {
                this.session = session;
                this.isAuthenticated = true;
                this.accessToken = session.access_token;
                this.fetchUser();
              } else {
                this.user = null;
                this.session = null;
                this.isAuthenticated = false;
                this.accessToken = null;
              }
            });
        },
    },
   });