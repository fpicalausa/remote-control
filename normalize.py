import sys
lines = []
with open(sys.argv[1], 'r') as f:
    lines = f.readlines()

state="header"
nums = []
frame = 1
frames = dict()
for line in lines:
    line = line.strip()
    if state == "header":
        if line == "":
            state = "frame"

    elif state == "frame":
        for num in filter(lambda x: len(x) > 0, line.split(" ")):
            if "-" in num:
                # print(str(frame) + " " + " ".join(str(x) for x in nums))
                frames[frame] = nums
                nums = []
                state = "trailer"
                break
            if num == "":
                continue

            nums.append(int(num))

    elif state == "trailer":
        if "-space" in line:
            state = "frame"
            frame = frame + 1
longest = 0
for k in frames:
    longest = max(longest, len(frames[k]))
 
print(";".join([str(x) for x in range(1, frame + 1)]))
for i in range(0, longest):
    points = []
    for f in range(1, frame+1):
        if len(frames[f]) > i:
            points.append(str(frames[f][i]))
        else:
            points.append("")
    print(";".join(points))
        