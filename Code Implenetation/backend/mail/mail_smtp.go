package mail

import (
	"net/smtp"
	"os"
)

var Smtp_server string
var Smtp_port string
var Auth smtp.Auth
var From string

func InitMailSMTP() {
	From = os.Getenv("EMAIL_ID")
	password := os.Getenv("EMAIL_PASS")

	Smtp_server = "smtp.gmail.com"
	Smtp_port = "587"

	Auth = smtp.PlainAuth("", From, password, Smtp_server)
}
