using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using kwtwsite.Models;

namespace kwtwsite.Models
{
    public class DataRepo
    {

        private DataClasses1DataContext db = new DataClasses1DataContext();

        public void Add(User newuser)
        {
            db.Users.InsertOnSubmit(newuser);
        }

        public void Add(Segment newseg)
        {
            db.Segments.InsertOnSubmit(newseg);        
        }

        public void Add(View vnew)
        {
            db.Views.InsertOnSubmit(vnew);
        }

        public void Delete(View view)
        {
            db.Views.DeleteOnSubmit(view);
        }

        public void Add(TopWeather wnew)
        {
            db.TopWeathers.InsertOnSubmit(wnew);
           
        }


        public void Save()
        {
            db.SubmitChanges();
        }
    }
}