namespace ECommerceApp.Utils.EmailSender
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
