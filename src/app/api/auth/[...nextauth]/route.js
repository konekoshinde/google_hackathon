import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connect } from "@/dbconfig/dbconfig";
import Person from "@/model/Person";
import doctor from "@/model/Doctor";


const authOptions = {
  
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
  ],
  session:{
    strategy: "jwt",
  },
  callbacks:{
 
      
    
      
    async signIn({token,user,email,account,profile}){
      try{
        connect();
        const currUser=await Person.findOne({
          email:user.email
        })
        
        if(currUser===null){
          await Person.create({
            email:user.email,
            name:user.name,
            access_token:account.access_token
          })
        }

      }
      catch(e){
        console.log(e);
      }
      return true;
    },

    async jwt({ trigger,token, account, profile,session}){
      if(account){
        const curr=await Person.findOne({email:profile.email})
        
        token.userdata=curr
      }
      if(session && trigger==="update"){
        
        if(token.userdata.isDoc){
          await doctor.findOneAndUpdate({email:token.userdata.email},{$set:{
            field:session.field,
            schedule:session.day
          }})
        }
        else{
          await Person.findOneAndUpdate({email:token.userdata.email},{isDoc:true})
  
          await doctor.create({
            email:token.userdata.email,
            field:session.field,
            schedule:session.day
          })
        }
        token.userdata=await Person.findOne({email:token.userdata.email})
        console.log(session)
      }
  
      return token;
    },
    async session({ session, trigger,token}){
      session.userdata=token.userdata;
      return session;

    }
    
  },
  events:{
    async signOut({token,session}){
    }
  }
  
}
const handler=NextAuth(authOptions);
export {handler as GET ,handler as POST}