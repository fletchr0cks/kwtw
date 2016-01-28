using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(kwtwsite.Startup))]
namespace kwtwsite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
