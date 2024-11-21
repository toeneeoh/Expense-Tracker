from flask import Blueprint, request, jsonify

bp = Blueprint('recommendations', __name__, url_prefix='/recommendations')

@bp.route('/update', methods=['POST', 'OPTIONS'])
def update_recommendations():
    if request.method == 'OPTIONS':
            return '', 200  # Respond to preflight request

    # get userData array from database and store in this dictionary, float values are in dollars and cents
    userData = {
        "userEmail": "johndoe@gmail.com", #user email, if needed
        "username": "John Doe", #actual name of user, for display purposes
        "password": "1234", #username to access specific username
        "jobTitle" : "a",
        "address" : "a",
        "cityName" : "a",
        "stateName" : "a", #just two letter, i.e. VA for Virginia
        "userGoal" : "debt", #either "debt", "savings", or "retirement"
        #"skills" : ["a", "b", "c"],
        "incomes" : [["a", 10000], ["b", 15000], ["c", 30000]], #all reported incomes
        "expenses" : [["a", 44444], ["b", 77777], ["c", 99999]], #all reported expenses
        "monthlyTotalIncomes" : [["a", 10000], ["b", 15000], ["c", 30000]], #all reported aggregate incomes by month
        "monthlyTotalExpenses" : [["Aug2024", 1500.19], ["Sep2024", 1324.19], ["Oct2024", 1631.19]], #all reported aggregate expenses by month
        "debts" : [["Credit Card A", 150.23, 9.20, 20.15], ["Credit Card B", 45.82, 6.50, 0], ["Student Loans", 15412.36, 3.50, 120.12]], #debt name, debt amount, annual interest rate, amount paid down on debt last month
        "roommatesNum" : 1, #refers to number of rent-splitting roommates, inlcuding user
        "dependentsNum" : 1, #refers to number of children/dependents that are having their bills paid for by the user
        "bedroomsNeeded" : 1, #refers to total number of bedrooms needed, for user, roommates, children/dependents, etc
        "savings" : 100,
        "savingsIncrease" : 100, #amount savings increased by last month
        "investmentsTotal" : 100, #value of stocks, real estate, owned businesses, etc.
        "incomeOther" : 100,
        "incomeJob" : 100,
        "weeklyHours" : 32,
        "expenseOther" : 100,
        "expenseGroceries" : 100,
        "expenseTakeout" : 100,
        "expenseDining" : 100,
        "expenseRent" : 100,
        "expenseSubscriptions" : 100,
        "expenseEntertainment" : 100, #includes movie tickets, fun purchases, anything not needed for survival. doesn't include dining or subscriptions.
        #"expenseUtilities" : 100,
        #"expenseCar" : 100,
    }


    #recommendationsList is a dictionary containing recommendations and "scores", scores are generated and then the list is sorted by score value
    #scores are roughly equal in value to cents theoretically gained per month
    uRecommendationsList = {"moveInCity": 100, 
    "moveOutCity" : 100, 
    "getBetterJob" : 100, 
    "payOffHighInterest" : 0, 
    "payOffSmallDebts" : 0, 
    "lessTakeout" : 100, 
    "cheaperGroceries" : 100,
    "lessEntertainment" : 100, #user should abide by the 50/30/20 rule, spending 30% or less of their income on entertainment
    "workMoreGigs" : 2, #user should work more hours by doordashing or instacarting
    "endSubscriptions" : 10, #todo
    "getRoommates" : 10, #user should get roommates to split rent
    "debtSettlement" : 2, 
    "bankruptcy" : 1,
    "buildSavings" : -100, #user should at least have 1 month of expenses in an emergency savings before paying down any debt at all, to avoid going into greater debt
    "saveMoreMoney" : -100, #user should save 20% or more of their income
    "investSavings" : -100, #user has a large amount of uninvested savings, more than one month's total expenses
    }
    expenseTotal = userData["expenseOther"] + userData["expenseGroceries"] + userData["expenseDining"]  + userData["expenseRent"]  + userData["expenseSubscriptions"]  + userData["expenseEntertainment"] + userData["expenseUtilities"]  + userData["expenseCar"]
    incomeTotal = userData["incomeJob"] + userData["incomeOther"]

    cityAverage = 0
    # if (userData["cityName"] == "Washington, D.C."):
    #     cityAverage = 2443


    # other implementation

    match userData["cityName"]:
        # data is included for bedroom sizes, but divided by number of roommates
        # studio apartment rents are used for "1 bedroom" valuations
        case "Washington, D.C.":
            if userData["bedroomsNeeded"] == 1:
                cityAverage = 1855.00
            elif userData["bedroomsNeeded"] == 2:
                cityAverage = 3084.00
            elif userData["bedroomsNeeded"] == 3:
                cityAverage = 3937.00
            elif userData["bedroomsNeeded"] == 4:
                cityAverage = 5366.00
            else:
                cityAverage = 2286.00
        case "Fairfax":
            if userData["bedroomsNeeded"] == 1:
                cityAverage = 1858.00
            elif userData["bedroomsNeeded"] == 2:
                cityAverage = 2514.00
            elif userData["bedroomsNeeded"] == 3:
                cityAverage = 2872.00
            elif userData["bedroomsNeeded"] == 4:
                cityAverage = 3474.00
            else:
                cityAverage = 2081.00
        case "Arlington":
            if userData["bedroomsNeeded"] == 1:
                cityAverage = 2047.00
            elif userData["bedroomsNeeded"] == 2:
                cityAverage = 3089.00
            elif userData["bedroomsNeeded"] == 3:
                cityAverage = 4082.00
            elif userData["bedroomsNeeded"] == 4:
                cityAverage = 6037.00
            else:
                cityAverage = 2341.00
        case "Austin":
            if userData["bedroomsNeeded"] == 1:
                cityAverage = 1266.00
            elif userData["bedroomsNeeded"] == 2:
                cityAverage = 1847.00
            elif userData["bedroomsNeeded"] == 3:
                cityAverage = 2416.00
            elif userData["bedroomsNeeded"] == 4:
                cityAverage = 6037.00
            else:
                cityAverage = 4239.00
        case "Sacramento":
            if userData["bedroomsNeeded"] == 1:
                cityAverage = 1476.00
            elif userData["bedroomsNeeded"] == 2:
                cityAverage = 1841.00
            elif userData["bedroomsNeeded"] == 3:
                cityAverage = 2371.00
            elif userData["bedroomsNeeded"] == 4:
                cityAverage = 2964.00
            else:
                cityAverage = 1547.00
        case "Denver":
            if userData["bedroomsNeeded"] == 1:
                cityAverage = 1487.00
            elif userData["bedroomsNeeded"] == 2:
                cityAverage = 2179.00
            elif userData["bedroomsNeeded"] == 3:
                cityAverage = 3067.00
            elif userData["bedroomsNeeded"] == 4:
                cityAverage = 4047.00
            else:
                cityAverage = 1663.00
        case _:
            # default value if city not found, average nationwide rent price
            cityAverage = 1558.00

    jobAverage = 0 #hourly rate
    match userData["jobTitle"]:
        case "Software Engineer":
            jobAverage = 45.13
            return
        case "Finance Analyst":
            jobAverage = 39.48
            return
        case "Lawyer":
            jobAverage = 40.52
            return
        case "Blue-Collar Worker": #plumbers, mechanics, electricians, etc.
            jobAverage = 25.69
            return
        case "Customer Service Worker": #unskilled entry-level customer service: cashier, waiter, etc
            jobAverage = 14.72
            return

    uRecommendationsList["moveInCity"] = (userData["expenseRent"]+userData["expenseUtilities"]-(cityAverage/userData["roommatesNum"]))
    uRecommendationsList["moveOutCity"] = (userData["expenseRent"]+userData["expenseUtilities"]-1558.00)
    uRecommendationsList["getBetterJob"] = ((userData["salaryHourly"]-jobAverage)*userData["weeklyHours"])
    #uRecommendationsList["changeJob"] = ((userData["salaryHourly"]-jobAverage)*userData["weeklyHours"])
    uRecommendationsList["lessTakeout"] = (userData["expenseTakeout"])
    uRecommendationsList["cheaperGroceries"] = ((userData["expenseGroceries"]-(250.00*userData["dependentsNum"]))*userData["dependentsNum"])
    uRecommendationsList["lessEntertainment"] = ((userData["expenseEntertainment"]+userData["expenseDining"]+userData["expenseSubscriptions"])-(incomeTotal*0.3))
    uRecommendationsList["workMoreGigs"] = ((35 - userData["weeklyHours"])*12)

    totalDebtPayments = 0

    for debt in userData["debts"]:
        totalDebtPayments = totalDebtPayments + debt[3]
    
        if (debt[1] < incomeTotal*0.1):
            uRecommendationsList["payOffSmallDebts"] = incomeTotal*0.1

    uRecommendationsList["payOffHighInterest"] = () #if user is spending lots on low interest debts and not high interest ones

    if (userData["roommates"] < 1 and userData["expenseRent"] > cityAverage):
        uRecommendationsList["getRoommates"] = (100.00)

    if (totalDebtPayments > 0 and userData["savings"] < expenseTotal):
        uRecommendationsList["buildSavings"] = (10000.00)

    if (userData["userGoal"] != "debt"):
        uRecommendationsList["saveMoreMoney"] = ((incomeTotal*0.2)-userData["savingsIncrease"])*5
        uRecommendationsList["investSavings"] = (userData["savings"] - expenseTotal)/10

    rList = list(uRecommendationsList.keys())
    rList.sort()

    #sorted dictionary
    sRecommendationsList = {i: uRecommendationsList[i] for i in rList}

    #get subtitles for recommendations by making 3 chatGPT calls
    top3Subtitles = {"a", "b", "c"} #replace abc with 3 chatgpt calls for 3 strings

    return jsonify({"rec1title": uRecommendationsList[0], 
                    "rec2title": uRecommendationsList[1], 
                    "rec3title": uRecommendationsList[2], 
                    "rec1desc" : top3Subtitles[0], 
                    "rec2desc" : top3Subtitles[1], 
                    "rec3desc" : top3Subtitles[2]})
