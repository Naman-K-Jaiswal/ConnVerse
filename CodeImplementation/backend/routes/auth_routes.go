package routes

import (
	"github.com/Naman-K-Jaiswal/ConnVerse/authn"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/send-otp", authn.SendOTP())
	incomingRoutes.POST("/signup", authn.SignUp())
	incomingRoutes.POST("/login", authn.Login())
	incomingRoutes.POST("/logout", authn.LogOut())
	incomingRoutes.POST("/forgot-password", authn.ForgotPassword())
}
