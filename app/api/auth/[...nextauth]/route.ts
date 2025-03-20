import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Définir les permissions Discord requises
const scopes = ["identify", "email"];

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: { params: { scope: scopes.join(" ") } },
    }),
  ],
  // Configuration de la session
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  // Personnaliser la page de connexion et les urls de redirection
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  // Ajouter des données supplémentaires au token et à la session
  callbacks: {
    async jwt({ token, user, account }) {
      // Ajouter des données Discord supplémentaires au token
      if (account && user) {
        token.id = user.id;
        
        // Si vous avez des rôles spécifiques pour les membres
        if (user.email === "pierrick.leclercq.pro@gmail.com" || 
            user.email?.endsWith("@admin.psychoallagan.fr") ||
            user.name === "lekhslecafeine") {
          token.role = "admin";
        } else if (user.email === "roster@psychoallagan.fr" ||
                  user.email?.endsWith("@roster.psychoallagan.fr") ||
                  user.email?.includes("raid-lead")) {
          token.role = "roster";
        } else {
          token.role = "member";
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Transmettre les données du token à la session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    // Gérer les redirections
    async redirect({ url, baseUrl }) {
      // Si l'URL est relative, la compléter avec baseUrl
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // Si l'URL est déjà absolue et sur le même hôte, la conserver
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Sinon, rediriger vers la page d'accueil
      return baseUrl;
    }
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST }; 