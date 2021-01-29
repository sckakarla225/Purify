import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import requests
from bs4 import BeautifulSoup
import time
import json
from collections import Counter
from datetime import datetime
from plotly import __version__
from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot
import cufflinks as cf
import plotly.express as px
import plotly.graph_objects as go
import IPython

init_notebook_mode(connected=True)
cf.go_offline()

native = pd.read_excel('/content/Native_FINALForReal.xlsx')
nonnative = pd.read_excel('/content/NonNative_FINALForReal.xlsx')

#Native Lands (EPA Region 9) Percentage with Violation in Past 3 years
nwviolation = len(native[native['QtrsWithVio'] > 0]) / len(native) 
#Native Lands (EPA Region 9) Percentage with Serious Violation
nsviolation = len(native[native['SeriousViolator'] == 'Yes']) / len(native) 
#Non-Native Lands Percentage with Violation in Past 3 years
nnwviolation = len(nonnative[nonnative['QtrsWithVio'] > 0]) / len(nonnative) 
#Non-Native Lands Percentage with Serious Violation
nnsviolation = len(nonnative[nonnative['SeriousViolator'] == 'Yes']) / len(nonnative) 


def configure_plotly_browser_state():
    display(IPython.core.display.HTML('''
            <script src="/static/components/requirejs/require.js"></script>
            <script>
            requirejs.config({
                paths: {
                base: '/static/base',
                plotly: 'https://cdn.plot.ly/plotly-latest.min.js?noext',
                },
            });
            </script>
            '''))

def violationFinder(url_id): 
    url = f'https://echo.epa.gov/app/proxy/proxy.php?s=dfr&p_id={url_id}&p_system=SDWIS'
    page = requests.get(url)
    data = page.json()

    violations = data["Results"]["ViolationsEnforcementActions"]["Sources"][0]["Violations"]
    contaminant = []

    for i in range(0, len(violations)): 
        violation = violations[i]

        if (violation["ContaminantName"] not in contaminant): 
        contaminant.append(violation["ContaminantName"])
            
    contaminant_count = [0]*len(contaminant)

    for i in range(0, len(violations)):
        violation = violations[i]
        curcont = violation["ContaminantName"]

        n = contaminant.index(curcont)
        contaminant_count[n] += 1 

    final_contaminant = []
    for i in range(0, len(contaminant)): 
        final_contaminant.append([contaminant[i], contaminant_count[i]])

    return final_contaminant

def ruleFinder(url_id):
    url = f'https://echo.epa.gov/app/proxy/proxy.php?s=dfr&p_id={url_id}&p_system=SDWIS'
    page = requests.get(url)
    data = page.json()
    data = data['Results']["ViolationsEnforcementActions"]["Sources"][0]['Violations']
    fedRules = []
    for i in range(0, len(data)):
        fedRules.append(data[i]['FederalRule'])
    rules = list(Counter(fedRules).keys())
    ruleCount = list(Counter(fedRules).values())
    ruleWithCount = []
    for i in range(0, len(rules)):
        ruleWithCount.append([rules[i], ruleCount[i]])
    
    return ruleWithCount

def statusFinder(url_id):
    url = f'https://echo.epa.gov/app/proxy/proxy.php?s=dfr&p_id={url_id}&p_system=SDWIS'
    page = requests.get(url)
    data = page.json()

    data = data['Results']["ViolationsEnforcementActions"]["Sources"][0]['Violations']
    unaddressed = 0
    resolved = 0
    none = 0
    dates = []
    for i in range(0, len(data)):
        if data[i]['Status'] == 'Unaddressed' or data[i]['Status'] == 'Unresolved':
        unaddressed += 1
        elif data[i]['Status'] == 'Resolved' or data[i]['Status'] == 'Addressed':
        resolved += 1
        dates.append(data[i]['ResolvedDate'])
        else:
        none += 1
        
    return [['unaddressed', unaddressed], ['resolved', resolved], ['none', none]]


nativedf = pd.read_excel("/content/Native_FINALForReal.xlsx")
nonnativedf = pd.read_excel("/content/NonNative_FINALForReal.xlsx")

native_ids = nativedf["PWSId"]
native_zipcode = nativedf["Zipcode"]
native_pop = nativedf["PopulationServedCount"]


nonnative_ids = nonnativedf["PWSId"]
nonnative_zipcode = nativedf["Zipcode"]
nonnative_pop = nonnativedf["PopulationServedCount"]


def proximityReport(native_id): 
    zipcode = nativedf[nativedf["PWSId"] == native_id]["Zipcode"]
    native_population = nativedf[nativedf["PWSId"] == native_id]["PopulationServedCount"]
    index = nativedf[nativedf["PWSId"] == native_id].index[0]
    zipcode = zipcode[index]
    native_population = native_population[index]
    a, b, c = str(zipcode)[0], str(zipcode)[1], str(zipcode)[2]

    samezip = []
    population = []
    for i in range(0, len(nonnative_zipcode)): 
        if (a == str(nonnative_zipcode[i])[0] and b == str(nonnative_zipcode[i])[1] and c == str(nonnative_zipcode[i])[2]):
        samezip.append(nonnative_ids[i])
        population.append(nonnative_pop[i])

    native_curr = statusFinder(str(0) + str(native_id))
    

    native_v = ((native_curr[0][1] + native_curr[1][1])) #violation numbers
    proximity_v = []

    native_p = round(((native_curr[0][1] + native_curr[1][1])/(native_curr[0][1] + native_curr[1][1] + native_curr[2][1])), 2)
    proximity_p = [] #violation proportion out of all visits

    native_n = round((((native_curr[0][1] + native_curr[1][1]))/(native_population)),2)*100
    proximity_n = []



    for i in range(0, len(samezip)): 
        nonnative_curr = statusFinder(samezip[i])

        nonnative_curr_v = ((nonnative_curr[0][1] + nonnative_curr[1][1]))
        proximity_v.append(nonnative_curr_v)

        nonnative_curr_p = round(((nonnative_curr[0][1] + nonnative_curr[1][1])/(nonnative_curr[0][1] + nonnative_curr[1][1] + nonnative_curr[2][1])), 2)
        proximity_p.append(nonnative_curr_p)

        nonnative_curr_n = round((((nonnative_curr[0][1] + nonnative_curr[1][1]))/(population[i])),2)*100
        proximity_n.append(nonnative_curr_n)


    proximity_v.append(native_v)
    proximity_p.append(native_p)
    proximity_n.append(native_n)

    proximity_v.sort(reverse = True)
    proximity_p.sort(reverse = True)
    proximity_n.sort(reverse = True)

    rank_v = int(proximity_v.index(native_v)) + 1
    rank_p = int(proximity_p.index(native_p)) + 1
    rank_n = int(proximity_n.index(native_n)) + 1

    proximity_v.remove(native_v)
    proximity_p.remove(native_p)
    proximity_n.remove(native_n)


    return [["Rank: " + str(rank_v) + "/" + str(len(proximity_n)), native_v, proximity_v],["Rank: " + str(rank_p)+ "/" + str(len(proximity_n)),native_p, proximity_p], ["Rank: " + str(rank_n)+ "/" + str(len(proximity_n)),native_n, proximity_n]]

# Graph 1
def ruleViz(url_id):
    SMALL_SIZE = 16
    MEDIUM_SIZE = 20
    BIGGER_SIZE = 23

    plt.rc('font', size=SMALL_SIZE)          # controls default text sizes
    plt.rc('axes', titlesize=BIGGER_SIZE)     # fontsize of the axes title
    plt.rc('axes', labelsize=MEDIUM_SIZE)    # fontsize of the x and y labels
    plt.rc('xtick', labelsize=SMALL_SIZE)    # fontsize of the tick labels
    plt.rc('ytick', labelsize=SMALL_SIZE)    # fontsize of the tick labels
    plt.rc('figure', titlesize=BIGGER_SIZE)

    ruleWithCount = ruleFinder('0'+ str(url_id))
    rules = []
    counts = []
    
    for i in range(0, len(ruleWithCount)):
        rules.append(str(ruleWithCount[i][0]))
        counts.append(ruleWithCount[i][1])
    rules = rules [:-1]
    counts = counts[:-1]
    
    df = pd.DataFrame({'rules' : rules, 'counts' : counts})
    
    sns.set_style('darkgrid')
    plt.figure(figsize=(20,8))
    plt.xticks(rotation=90)
    name = native[native['PWSId'] == int(url_id)]['PWSName']
    index = native[native['PWSId'] == int(url_id)]['PWSName'].index[0]
    plt.title(name[index]+ ' Rule Violations')
    plot = sns.barplot(x='rules', y = 'counts', data=df)
    plt.xlabel('Federal Rule')
    plt.ylabel('Frequency')
    
    return plot

# Graph 2
def violationViz(url_id):
    SMALL_SIZE = 16
    MEDIUM_SIZE = 20
    BIGGER_SIZE = 23

    plt.rc('font', size=SMALL_SIZE)          # controls default text sizes
    plt.rc('axes', titlesize=BIGGER_SIZE)     # fontsize of the axes title
    plt.rc('axes', labelsize=MEDIUM_SIZE)    # fontsize of the x and y labels
    plt.rc('xtick', labelsize=SMALL_SIZE)    # fontsize of the tick labels
    plt.rc('ytick', labelsize=SMALL_SIZE)    # fontsize of the tick labels
    plt.rc('figure', titlesize=BIGGER_SIZE)

    violationsWithCount = violationFinder('0' + str(url_id))

    violations = []
    vcounts = []
    for i in range(0, len(violationsWithCount)):
        violations.append(str(violationsWithCount[i][0]))
        vcounts.append(violationsWithCount[i][1])
    violations = violations [:-1]
    vcounts = vcounts[:-1]
    
    df = pd.DataFrame({'violations' : violations, 'counts' : vcounts})

    sns.set_style('darkgrid')
    plt.figure(figsize=(20,8))
    plt.xticks(rotation=90)
    name = native[native['PWSId'] == int(url_id)]['PWSName']
    index = native[native['PWSId'] == int(url_id)]['PWSName'].index[0]
    plt.title(name[index]+ ' Contaminant Violations')
    plot = sns.barplot(x='violations', y = 'counts', data=df)
    plt.xlabel('Contaminant')
    plt.ylabel('Frequency')
    
    return plot

# Graph 3
def statusViz(url_id):
    SMALL_SIZE = 16
    MEDIUM_SIZE = 20
    BIGGER_SIZE = 23

    plt.rc('font', size=SMALL_SIZE)          # controls default text sizes
    plt.rc('axes', titlesize=BIGGER_SIZE)     # fontsize of the axes title
    plt.rc('axes', labelsize=MEDIUM_SIZE)    # fontsize of the x and y labels
    plt.rc('xtick', labelsize=SMALL_SIZE)    # fontsize of the tick labels
    plt.rc('ytick', labelsize=SMALL_SIZE)    # fontsize of the tick labels
    plt.rc('figure', titlesize=BIGGER_SIZE)

    statusWithCount = statusFinder('0'+ str(url_id))
    status = []
    counts = []

    for i in range(0, len(statusWithCount)):
        status.append(str(statusWithCount[i][0]))
        counts.append(statusWithCount[i][1])
    status = status [:-1]
    counts = counts[:-1]

    df = pd.DataFrame({'status' : status, 'counts' : counts})

    sns.set_style('darkgrid')
    plt.figure(figsize=(20,8))
    plt.xticks(rotation=90)
    name = native[native['PWSId'] == int(url_id)]['PWSName']
    index = native[native['PWSId'] == int(url_id)]['PWSName'].index[0]
    plt.title(name[index]+ ' Status Violations')
    plot = sns.barplot(x='status', y = 'counts', data=df)
    plt.xlabel('Status')
    plt.ylabel('Frequency')
    return plot


values = proximityReport(90600159)

native_violations = [values[0][1]]
native_popratio = [values[2][1]]
non_violations = values[0][2]
non_popratio = values[2][2]

# Graph 4
def relativeViolations():
    configure_plotly_browser_state()
    fig = go.Figure()

    fig.add_trace(go.Scatter(x = native_violations, y= native_popratio, mode='markers', opacity = .5,
                            name = 'Native Community', marker=dict(size=60, color='red', 
                            line=dict(color='Black',width=2))))
    fig.add_trace(go.Scatter(x = non_violations, y= non_popratio, mode='markers', opacity = .5, 
                            name = 'Non-native Community', marker=dict(size=30, color='blue', line=dict(color='Black',width=2))))

    fig.update_layout(
        title="Violation and Population Ratio Scatter Plot",
        xaxis_title = 'Number of Violations',
        yaxis_title = 'Violations per 100 People'
        )

    fig.show()


combined = nonnative.append(native)
combined = combined[combined['TotalVio'] > 0]

sns.set_style('darkgrid')
plt.figure(figsize=(12,6))
sns.scatterplot(x = 'Unaddressed', y = 'Resolved', data = combined, hue='Type', size='QtrsWithVio', palette='Accent')

configure_plotly_browser_state()
fig = go.Figure()
fig = px.scatter(combined, x="Unaddressed", y="Resolved", color="Type", opacity = .8, size='TotalVio',
                  hover_data=['TotalVio'])
fig.show()


# name of establishment, city, county, state, 