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

        public void Save()
        {
            db.SubmitChanges();
        }
    }
}