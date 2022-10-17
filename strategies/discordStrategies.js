import { Strategy } from "passport-discord";
import passport from "passport";
import dotenv from "dotenv";
import DiscordUser from "../models/DiscordUser.js";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await DiscordUser.findById(id);
  if (user) done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`

        if (user) {
          done(null, user);
        } else {
          const newUser = await DiscordUser.create({
            discordId: profile.id,
            fullName: profile.username,
            email: profile.email,
            avatarUrl: avatarUrl,
          });
          const saveUser = await newUser.save();
          done(null, saveUser);
        }
      } catch {
        console.log(err);
        done(err, null);
      }
    }
  )
);

export default passport;
