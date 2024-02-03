package routes

import (
	"backend/authn"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/send-otp", authn.SendOTP())
	incomingRoutes.POST("/verify-otp", authn.VerifyOTP())
	incomingRoutes.POST("/signup", authn.SignUp())
	incomingRoutes.POST("/login", authn.Login())
	incomingRoutes.PUT("/change-password", authn.ChangePassword())
}
