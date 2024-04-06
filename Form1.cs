using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TransactX_1._0
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string connetionString;
            SqlConnection cnn;
            connetionString = @"Data Source=LAPTOP-3083ALK8\SQLEXPRESS01;Initial Catalog=credit;Integrated Security=True;";
            cnn = new SqlConnection(connetionString);
            cnn.Open();
            String sql, Output = "";
          /*  sql = "select SSN from admin";
            SqlCommand command = new SqlCommand(sql, cnn);
            SqlDataReader dataReader = command.ExecuteReader();
            Output = "SSN \n";
            while (dataReader.Read())
            {
                Output += dataReader.GetValue(0) + "\n";
            }
            */
            //For insertion:
            sql = "Insert into admin (Username, Password,SSN) values (ManviKishore ,'" + "manvi123 ,'" + " 08197"+"')" ;
            SqlCommand command = new SqlCommand(sql, cnn);
            SqlDataAdapter adapter = new SqlDataAdapter();
            adapter.InsertCommand = command;
            adapter.InsertCommand.ExecuteNonQuery();


         //   MessageBox.Show(Output);
           // dataReader.Close();
            command.Dispose();
            cnn.Close();
        }
    }
}
 


