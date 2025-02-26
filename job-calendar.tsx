"use client"

import React from "react"
import { ChevronLeft, ChevronRight, Filter, Plus, Search, User } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JobCalendar() {
  const [view, setView] = useState("calendar")
  const hours = Array.from({ length: 10 }, (_, i) => i + 6)
  const days = ["Mon 5", "Tue 6", "Wed 7", "Thu 8", "Fri 9", "Sat 10", "Sun 11"]

  // Sample job data
  const jobs = [
    { id: 1, day: 1, startHour: 7, address: "45 Habitat Boulevard", color: "bg-blue-100" },
    { id: 2, day: 2, startHour: 8, address: "25 Poitier St, McDowall", color: "bg-yellow-100" },
    { id: 3, day: 4, startHour: 10, address: "124 Wimmers Hill Road", color: "bg-green-100" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b w-full">
        <div className="max-w-6xl mx-auto flex items-center gap-4 py-4 px-4">
          <h1 className="text-xl font-semibold">My jobs</h1>
          <div className="ml-auto flex items-center gap-2">
            <Input type="search" placeholder="Search..." className="w-[200px]" />
          </div>
        </div>
      </header>

      <main className="flex-grow flex justify-center items-start p-4">
        <div className="max-w-6xl w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Tabs defaultValue="calendar" className="w-auto">
                <TabsList>
                  <TabsTrigger value="kanban">Kanban</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Job
              </Button>
              <Button variant="outline" size="icon">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <User className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Jobs</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>In Progress</DropdownMenuItem>
                  <DropdownMenuItem>Completed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline">Today</Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <span className="text-sm">5th Feb - 11th Feb</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-2">
                    Week
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Day</DropdownMenuItem>
                  <DropdownMenuItem>Week</DropdownMenuItem>
                  <DropdownMenuItem>Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="border rounded-lg overflow-x-auto">
              <div className="grid grid-cols-[auto_repeat(7,1fr)] min-w-[800px]">
                <div className="p-2 border-r border-b"></div>
                {days.map((day) => (
                  <div key={day} className="p-2 text-center border-r last:border-r-0 border-b">
                    {day}
                  </div>
                ))}

                {hours.map((hour) => (
                  <React.Fragment key={hour}>
                    <div className="border-r border-b p-2 text-xs text-muted-foreground">
                      {`${hour}:00 ${hour >= 12 ? "PM" : "AM"}`}
                    </div>
                    {days.map((_, dayIndex) => (
                      <div key={dayIndex} className="border-r last:border-r-0 border-b h-[60px] relative">
                        {jobs.map((job) => {
                          if (job.day === dayIndex && job.startHour === hour) {
                            return (
                              <div
                                key={job.id}
                                className={`absolute top-0 left-0 right-0 m-1 p-2 rounded text-xs ${job.color}`}
                              >
                                {job.address}
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

