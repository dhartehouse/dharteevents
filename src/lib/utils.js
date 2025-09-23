import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { format, parseISO, isAfter, isBefore, startOfDay, endOfDay, addDays } from 'date-fns'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString, formatStr = 'MMM dd, yyyy') {
  return format(parseISO(dateString), formatStr)
}

export function formatDateTime(dateString, formatStr = 'MMM dd, yyyy • h:mm a') {
  return format(parseISO(dateString), formatStr)
}

export function formatTime(timeString) {
  if (!timeString) return ''
  return timeString
}

export function isEventToday(startDate) {
  const today = startOfDay(new Date())
  const eventDate = startOfDay(parseISO(startDate))
  return eventDate.getTime() === today.getTime()
}

export function isEventThisWeekend(startDate) {
  const now = new Date()
  const eventDate = parseISO(startDate)
  const nextSaturday = addDays(now, (6 - now.getDay()) % 7)
  const nextSunday = addDays(nextSaturday, 1)
  
  return (
    isAfter(eventDate, startOfDay(nextSaturday)) &&
    isBefore(eventDate, endOfDay(nextSunday))
  )
}

export function isEventNext7Days(startDate) {
  const now = new Date()
  const eventDate = parseISO(startDate)
  const next7Days = addDays(now, 7)
  
  return isAfter(eventDate, now) && isBefore(eventDate, next7Days)
}

export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
}

export function generateOrderId() {
  return 'DHT' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase()
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
