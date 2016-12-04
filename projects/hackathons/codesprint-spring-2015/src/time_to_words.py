HOURS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
TENS_MINUTES = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
MINUTES_ONES_PLACE = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

def time_to_str(hour, minutes):
    if minutes == 0:
        return HOURS[hour - 1] + ' o\' clock '
    elif minutes == 1:
        return 'one minute past ' + HOURS[hour - 1 % 12]
    elif minutes == 59:
        return 'one minute to ' + HOURS[hour % 12]
    elif minutes == 30:
        return 'half past ' + HOURS[hour - 1 % 12]
    elif minutes == 45:
        return 'quarter to ' + HOURS[hour % 12]
    elif minutes == 25:
        return 'quarter past ' + HOURS[hour - 1 % 12]

    past_thirty = False
    if minutes > 30:
        minutes = 60 - minutes
        past_thirty = True

    hour = HOURS[hour % 12] if past_thirty else HOURS[hour - 1 % 12]
    minutes_digits = [int(minute) for minute in list(str(minutes))]
    adjective = 'to' if past_thirty else 'past'
    minutes_str = ''

    if minutes < 10:
        minutes_str = MINUTES_ONES_PLACE[minutes - 1]
    elif minutes < 20:
        minutes_str = TENS_MINUTES[minutes % 10]
    else:
        minutes_str = 'twenty'
        if minutes % 10 != 0:
            minutes_str += ' ' + MINUTES_ONES_PLACE[minutes_digits[1] - 1]

    return '{0} minutes {1} {2}'.format(minutes_str, adjective, hour)



if __name__ == '__main__':
    hour = int(input())    
    minutes = int(input())

    print(time_to_str(hour, minutes))