
create database credit


----Step 2
Use credit

create table Account (AccountNumber varchar(500) PRIMARY KEY,DateClosed datetime, DateOpened datetime
, AccountStatus varchar(200), AccountBalance decimal(36,10)
);

create table Person (
	SSN varchar(500) Primary key,
	Firstname varchar(500), 
	Lastname varchar(500),	--will be encrypted later when salt is applied
	StreetAddress varchar(max),
	City varchar(max),
	State varchar(max)

);

create table customer (SSN varchar(500) foreign key references Person(SSN),
                      AccountNumber varchar(500) foreign key references Account(AccountNumber),
                      PRIMARY KEY (SSN, AccountNumber),username varchar(500) Unique, Password varchar(max)
                      );


create table Admin ( Username varchar(500) primary key,Password varchar(max),SSN varchar(500) UNIQUE foreign key references Person(SSN)); --SSN is added to fetch more detailed information about the person)

create table CreditCard (CardNum varchar(500) Primary Key , AccountNumber varchar(500) foreign key references Account(AccountNumber), CardType varchar(500), Annual_Percentage_Rate decimal(36,10),InterestLatePayment decimal(36,10)) -- CardType has been used to describe whether card is visa,master etc.This gives us more leverage for group by 

create table CreditLinePayment (CreditLineID int IDENTITY(1,1) Primary Key
                        ,CardNum varchar(500) UNIQUE FOREIGN key REFERENCES CreditCard(CardNum) 
                        ,Current_Balance decimal(36,10) --total credit utilized by credit card till date
                        ,Min_Payment decimal(36,10),Duedate datetime, nextClosingDate date ,CreditLineInterest decimal(36,10)
                        ,Total_Amount_Payable decimal(36,10),Total_credit_Allocated decimal(36,10) -- total credit depends on the cardType and the credit history of the person so this need not be card specific only


)

create table TransactionType (TransactionTypeID int IDENTITY(1,1) primary key, Type varchar(500))

create table transactions (TransactionID int identity(1,1) primary key ,cardNum varchar(500) FOREIGN key REFERENCES CreditCard(CardNum)
                           , TransactionDateTime datetime, TransactionTypeID int foreign key REFERENCES TransactionType(TransactionTypeID), Amount decimal(36,10))

 

create table CustomerPayments (PaymentID int identity(1,1) primary key, creditLineID int  Unique foreign key references CreditLinePayment(CreditLineID),PaymentAmount decimal(36,10), Paymentdate datetime, PaymentStatus varchar(500))




----Step 3
Use credit


Insert into Account (accountNumber,dateclosed,DateOpened,AccountStatus,AccountBalance)
Select 'A100', NULL, DATEADD(year, -1, GETDATE()),'Open', 25000

--Select * from Account


insert into person (SSN, Firstname, Lastname, StreetAddress, City, State)
Select '12345','Anushka','Bhat','2520 Abbey Drive','Fort Wayne','Indiana'
union
Select '45678','Pauline','Korukundo', '821 W jefferson', 'Houston','Texas'

--Select * from person

insert into customer (SSN, AccountNumber,Username,Password)
Select '12345','A100','AnushkaBhat','Purdue1234'

--Select * from customer

insert into Admin (Username, Password,SSN)
Select 'PaulineK','Admin1234','45678'

--Select * from Admin

insert into CreditCard (cardNum,AccountNumber,CardType,Annual_Percentage_Rate,InterestLatePayment)
Select 'C100', 'A100', 'VISA', 10,0.2

--Select * from CreditCard

Insert into CreditLinePayment (CardNum,Current_Balance,Min_Payment,Total_Amount_Payable,Total_credit_Allocated,nextClosingDate,duedate)
Select 'C100', 2500, 200, 1200,20000,'2024-04-30', '2024-03-31'

--Select * from CreditLinePayment

insert into TransactionType (Type)
Select 'Online'
UNION
Select 'Store Purchase'
UNION
Select 'Bill payment'

--Select * from TransactionType


insert into transactions (cardNum,TransactionDateTime,TransactionTypeID,Amount)
Select 'C100', DATEADD(Day, -6, '2024-03-31'),1,1000
UNION
Select 'C100', DateADD(Day, -4, '2024-03-31'),1,200

--Select * from transactions

--Note that 1200 amounts upto total payable in the credit data for the person
--Still have to fuigue out how to store historical data

insert into CustomerPayments (creditLineID,PaymentAmount,Paymentdate,PaymentStatus)
Select 1, 200, '2024-03-31', 'minimum payment completed'

--Select * from CustomerPayments


